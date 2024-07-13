import EditUser from './../../../ui/edit-user';
export default function EditPage({ params }) {
  const id = params.id;
  return (
    <EditUser id={id} />
  )
}
