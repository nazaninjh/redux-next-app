import UserComponent from './../../../components/user';
export default function Userpage({ params }) {
  const userId = params.userId;
  
   return <UserComponent userId={userId} />
  
}
