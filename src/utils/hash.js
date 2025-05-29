import bcrypt from 'bcrypt';

const saltRounds = 10; //Numero de rondas para generar el hash de la contraseña

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
