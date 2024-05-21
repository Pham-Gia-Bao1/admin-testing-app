import Column from "../components/column";
const Comment = () => {
  function onDelete(record){
    console.log(record.id)
  }
  return <Column apiEndpoint="http://127.0.0.1:8000/api/admin/comments" onDelete={onDelete} />; // thay omponent khác vào
};
export default Comment;
