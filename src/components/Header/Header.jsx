import { BellDot, CircleUserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/userSlice";
import { useCallback, useState } from "react";
import { searchUsers } from "../../api/userService";

import debounce from "lodash.debounce";
function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [srchParams, setSrchParams] = useState();
  const [srchRecommendations,setSrchRecommendations]=useState([])
  const fetchRecommendations = async (searchTerm) => {
    console.log("Fetching recommendations for:", searchTerm);
    const res = await searchUsers(searchTerm);
    console.log(res.data);
    setSrchRecommendations(res.data)
  };

  const debouncedFetchRecommendations = useCallback(
    debounce((searchTerm) => {

      if (searchTerm.trim() === "") {
        setResults([]);
        return;
      }
      fetchRecommendations(searchTerm);
    }, 300), // 300ms debounce
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSrchParams(value);
    // Call the debounced function
    debouncedFetchRecommendations(value);
  };

  return (
    <div className="  font-semibold flex justify-between items-center gap-2 px-6 py-2">
      <div className="flex justify-between  w-1/3">
        <Link to={'/'} className="font-bold text-4xl ">Social.</Link>
        <div className="w-2/3 relative   ">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search Friends..."
            disabled={!user.status}
           autoComplete="off"
            className=" rounded-md w-full h-full text-xl p-2 outline-none border-2 border-zinc-400"
            value={srchParams}
            onChange={(e) => handleInputChange(e)}
          ></input>
          <ul className=" text-black absolute w-full rounded-md bg-gray-300 ">
            {srchRecommendations.map((item, index) => (
              <li key={index} className="p-1 m-1 hover:bg-gray-500 rounded-md" onClick={
                ()=>{
                  navigate(`/user/${item._id}`)
                  setSrchParams(item.username)
                  setSrchRecommendations([])
              }} >
                {item.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="  w-2/3 flex justify-end   ">
        {!user.status ? (
          <div className="text-2xl space-x-6 ">
            <Link to={"/auth/login"} className="text-blue-500 ">
              Login
            </Link>
            <Link
              to={"/auth/signup"}
              className="text-white bg-blue-600 hover:bg-blue-500 p-2 px-5 rounded-3xl"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className=" flex   text-xl space-x-6 ">
            <div onClick={()=>navigate('/notification')}>
              <BellDot size={35} />
            </div>
            <div  onClick={()=>navigate('/me')} className="font-normal flex gap-2 cursor-pointer ">
              <CircleUserRound size={35} />
              <p>{user.user.username}</p>
            </div>
            <button
              className="text-white bg-red-600 hover:bg-red-500 p-2  rounded-3xl"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
