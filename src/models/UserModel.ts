import mongoose, { model, Schema, Document, Model } from 'mongoose';

import CustomMongoValidation from '@src/interfaces/enums/CustomMongoValidation';
import IUser from '@src/interfaces/IUser';
import EncryptProvider from '@src/providers/EncryptProvider';
import Logger from '@src/utils/Logger';

export interface IUserModel extends Omit<IUser, '_id'>, Document {
  id: string;
}

const userSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    token: { type: String, default: null },
    ultimo_login: { type: String, default: new Date().toISOString() },
    telefones: [
      {
        numero: { type: String, required: true },
        ddd: { type: String, required: true },
      },
    ],
    data_criacao: { type: String, default: new Date().toISOString() },
    data_atualizacao: { type: String, default: new Date().toISOString() },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  },
);

userSchema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
  },
  'E-mail já existente',
  CustomMongoValidation.DUPLICATED,
);

userSchema.pre<IUserModel>('save', async function (): Promise<void> {
  if (!this.senha || !this.isModified('senha')) {
    return;
  }

  const encryptProvider = new EncryptProvider();
  try {
    this.senha = await encryptProvider.generateHash(this.senha);
  } catch (error) {
    Logger.error({
      msg: 'error during the process to encrypt the password',
      error,
    });
  }
});

export default model('User', userSchema) as Model<IUserModel>;
