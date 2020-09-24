export default interface IUser {
  nome: string;
  email: string;
  senha: string;
  data_criacao: string;
  data_atualizacao: string;
  token?: string;
  ultimo_login?: string;
  telefones: { numero: string; ddd: string }[];
}
