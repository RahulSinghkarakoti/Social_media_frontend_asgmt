function FriendCard({ id, name }) {
  if (!id || !name) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="bg-pink-100 hover:bg-pink-200  rounded-md w-full flex justify-between items-center p-2">
        <div className=" flex flex-col ">
          <p>ID:{" "} {id}</p>
          <p>Name:{" "} {name}</p>
        </div>
      </div>
    );
  }
}

export default FriendCard;
