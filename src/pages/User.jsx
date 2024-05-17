import Column from "../components/column";
const User = () => {
  function onDelete(record){
    console.log(record.id)
  }
  // ...
  return <Column apiEndpoint="https://jsonplaceholder.typicode.com/users" onDelete={onDelete} />; // thay omponent khác vào
};

export default User;
