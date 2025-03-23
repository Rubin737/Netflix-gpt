export const checkValidate = (name,mail,password)=>{
  const errors = {};
  const nameValidate = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);
  const mailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
  const passwordValidate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  
  if(nameValidate === false) errors.name = 'Name is not Valid';
  if (mailValidate === false) errors.mail = "Mail is not Valid";
  if (passwordValidate === false) errors.password = "Password is not Valid";

  return errors;
}