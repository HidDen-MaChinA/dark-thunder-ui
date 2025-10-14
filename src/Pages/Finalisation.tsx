import { useEffect, useState } from "react";
import Button from "../Components/Login/Button";
import { UserProvider } from "../Providers/UserProviders";
import { useNavigate } from "react-router-dom";
import TextField from "../Components/TextField";

export default function Finalisation() {
  const navigate = useNavigate();
  const [pfp, setPfp] = useState<File | null>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const toVerify = sessionStorage.getItem("dt-email-verify");
    const verifiedAt = sessionStorage.getItem("dt-verified-at");
    if(!(verifiedAt && toVerify)){
      navigate("/user/login")
    }else{
      setEmail(toVerify);
    }
  }, []);

  const PFPInputEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.item(0)) {
      console.log(files.item(0) as Blob)
      setPfp(files.item(0));
    }
  };

  const submitEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    UserProvider.create({
      birthdate: birthdate,
      email: email,
      firstname: firstname,
      lastname: lastname,
      pfp:pfp,
      password: password,
      username: username,
    }).then(()=>{
      navigate("/user/login")
    });
  };

  return (
    <div className="w-[100vw] h-[100vh] p-3 flex justify-center items-center">
      <form method="POST" encType="multipart/form-data" onSubmit={submitEventHandler}>
        <div className="shadow-lg rounded-xl border">
          <h1 className="w-full text-center py-3 text-2xl">
            Register finalisation
          </h1>
          <div className="flex gap-3">
            <div className="flex px-6 pb-4 flex-col gap-2">
              <TextField
                label="Firstname"
                placeholder="JOHN"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                label="Lastname"
                placeholder="Doe"
                onChange={(e) => setLastname(e.target.value)}
              />
              <TextField
                label="Username"
                placeholder="Doe"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                type={"date"}
                label="Birthdate"
                onChange={(e) => setBirthdate(e.target.value)}
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                label="Password"
                placeholder="Your Password"
              />
              <TextField
                onChange={(e) => {
                  if (e.target.value == password) {
                    setPasswordAgain(true);
                  } else {
                    setPasswordAgain(false);
                  }
                }}
                type={"password"}
                label="Password verification"
                placeholder="Your Password again"
              />
              <Button disabled={!passwordAgain}>Register</Button>
            </div>
            <div className="flex justify-center flex-col gap-4 items-center w-[300px]">
              <div className="w-[200px] h-[200px] rounded-full bg-gray-200 border-4 border-gray-400 relative overflow-hidden">
                <img
                  src={pfp ? URL.createObjectURL(pfp as Blob) : ""}
                  alt=""
                  className="min-w-[200px] min-h-[200px]  absolute translate-[-50% -50%]"
                />
              </div>
              <div>
                <label
                  className="border border-black block relative p-2 hover:bg-black hover:text-white transition-[500ms] rounded-lg"
                  htmlFor="FillUserInformationPFP"
                >
                  <input
                    onChange={PFPInputEventHandler}
                    id="FillUserInformationPFP"
                    type="file"
                    hidden
                  />
                  <p>Modify PFP</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
