import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { CloudUpload, DoorOpen, EyeClosed, EyeIcon, Info, Key, LockIcon, ShoppingCart, User } from "lucide-react";
import { ShopContext } from "../components/ContextProvider";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passform, setPassform] = useState({email:"", security_question:"",password:""});
  const [passerror, setPasserror] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [passtype, setpasstype] = useState('password');

  // passing functions from the context
  const {cancelErr,notify} = useContext(ShopContext)

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if(token) {
  //   navigate('/')
  //   }
  // },[])

  async function sendNotify (type,message) {
    notify(type,message);

    setTimeout(() => {
      cancelErr()
    }, 3000);
  }

 const handleSubmit = async (e) => {
  e.preventDefault(); // Moved to the top for better practice
  
  // PASSWORD LENGTH CHECK
  if (formData.password.length < 6) {
    sendNotify("failure","password must be 6 digit long")
    setTimeout(() => { setError(""); }, 3000);
    return; // This stops the form from submitting
  }

  setLoading(true);
  try {
    await API.post("/api/auth/login", formData).then(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      sendNotify("success","login successful")
      setTimeout(() => {
        navigate('/')
      }, 1000)
    })
  } catch (err) {
    setLoading(false);
    if (err?.response?.message) {
      setError("Invalid credentials");
    } else {
      sendNotify("failure","NetworkError")
    }        
  }
};

async function submitPass (e) {
  e.preventDefault();

    
  // PASSWORD LENGTH CHECK
  if (passform.password.length < 6) {
    setPasserror("Password must be at least 6 characters long");
    setTimeout(() => { setPasserror(""); }, 3000);
    return; // This stops the form from submitting
  }

  setLoading(true);
  try {
    const { data } = await API.post("/api/auth/resetpass", passform.password);
    console.log(data._id);
    // SAVE DATA TO LOCAL STORAGE
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data._id);
    setLoading(false);
    navigate("/", {replace: true}); 
    setTimeout(() => {
        navigate('/')
    }, 500)// Go to the Chat Page
  } catch (err) {
    setLoading(false);
    if (err?.response?.message) {
      setPasserror("Invalid security question");
    } else {
      console.log(err);
      setPasserror(err?.message);
    }        
    setTimeout(() => { setPasserror(""); }, 3000);
  }
}
  return (
   <>
    <div className=" w-full h-screen relative flex justify-center items-center">

       {/* main frame */}
       <div className="w-full lg:w-3/10 max-md:mx-4 px-4 border border-slate-200 shadow-md bg-blue-100 p-1 py-4 duration-200">
        {/* navbar */}

        <div className="w-full mb-3 flex gap-2 justify-between items-center">
          {/* sign In */}
          <Link to={'/login'}
          className="group w-full bg-green-500 text-white flex items-center gap-3 text-xs h-[50px] justify-center">
            <span className="scale-0 w-0 group-hover:scale-100 origin-right group-hover:w-[50px] duration-300 transition-all">
              Sign In
            </span>

            <DoorOpen size={20} />
          </Link>

          {/* signup */}
          <Link to={'/signup'}
          className="group w-full hover:bg-green-200 text-green-700 flex items-center justify-center gap-3 h-[50px] text-xs">
            <span className="scale-0 w-0 group-hover:scale-100 origin-right group-hover:w-[50px] duration-300 transition-all">
              Sign Up
            </span>

            <CloudUpload size={20} />
          </Link>
        </div>

          <h1 className="font-semiibold flex items-center gap-2 text-blue-700 mb-3 pb-2 border-b-2 border-slate-300">Login to ShoppingCart <ShoppingCart/></h1>

          <form onSubmit={handleSubmit}
          className="flex flex-col">
            <label htmlFor="" className="text-sm mt-3 text-gray-800">Email</label>
            {/* email */}
          <div className="relative w-full">
          <User size={17} className="absolute left-3 h-full" />
              <input type="email"
            className="bg-slate-100 w-full pl-10 border-0 py-4 text-xs focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="david@gmail.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required/>
          </div>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Password</label>
            {/* password */}
            <div className="w-full relative">
              <Key className="absolute h-full left-3" size={17}/>
            <input type={passtype}
            className="w-full pl-10 h-full bg-slate-100 border-0 py-4 text-xs focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="Password..."
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required/>
            <button type="button"
            className="absolute right-5 top-1 h-full"
            onClick={() => setpasstype(passtype == 'password' ? 'text' : 'password')}>
              {passtype == "password" ? <EyeClosed size={15}/> : <EyeIcon size={15}/>}
            </button>
            </div>
           
            {/* forgot password */}
            <div className="flex w-full justify-end">
              <a 
              className="flex items-center gap-2 text-xs mt-2 text-red-600">
                forgot password <Info size={15}/>
              </a>
            </div>

            {/* button for submit */}
             <button 
            className="mt-4 mb-5 w-fulltext-white flex gap-1 items-center justify-between  cursor-pointer group  duration-300">
                <span className="w-full text-xs text-white bg-green-500 p-3 flex justify-center items-center font-semibold hover:shadow-md duration-300">
                  {loading ? <LoadingSmall/> : 'Sign In'}
                </span>
                <span className="p-3 scale-0 origin-right hidden group-hover:scale-100 text-white group-hover:block  bg-green-700 hover:shadow-md transition-all duration-300">
                  <CloudUpload size={16}/>
                </span>
            </button>
          </form>
       </div>
    </div>
   </>
  );
};

export default LoginPage;