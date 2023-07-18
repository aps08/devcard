import Input from "../input/Input";
import { CITIES } from "../../utils/Constants";
import { useEffect, useState } from "react";
import { setData } from "../../redux/userinfoSlice";
import { useSelector, useDispatch } from "react-redux";
import Callendpoint from "../../utils/Callendpoint";
import Loading from "../../utils/Loading";
import _ from "lodash";
import "./Personal.css";

function Personal() {
  const dispatch = useDispatch();
  const [message, setmessage] = useState(false);
  const [error, seterror] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const userdata = useSelector((state) => state.userInfo?.personal);
  const [Formdata, setFormdata] = useState();

  useEffect(() => {
    setFormdata(userdata);
  }, [userdata]);

  useEffect(() => {
    setTimeout(() => {
      if (error || message) {
        seterror(false);
        setmessage(false);
      }
    }, 5000);
  }, [error, message]);

  const changehandler = (event) => {
    seterror(false);
    const { name, value } = event.target;
    setFormdata({ ...Formdata, [name]: value });
  };
  const personalhandler = async (event) => {
    event.preventDefault();
    seterror(false);
    if (!_.isEqual(Formdata, userdata)) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("put", "/user/personal", null, Formdata, true);
      if (statuscode === 200) {
        setmessage(data.message);
        dispatch(setData({ key: "personal", value: data.data }));
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
    }
  };

  return (
    <>
      <Loading spinner={submitted} />
      <form id="personaldetails" onSubmit={personalhandler}>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <h2 className="para mb-1">Personal details</h2>
        <div className="user_name">
          <Input
            label="first name"
            name="first_name"
            change={changehandler}
            hints={null}
            setvalue={Formdata?.first_name}
            placeholder="enter first name"
            valid={true}
          />
          <Input
            label="middle name"
            name="middle_name"
            change={changehandler}
            hints={null}
            setvalue={Formdata?.middle_name}
            placeholder="enter middle name"
            valid={true}
          />
          <Input
            label="Last name"
            name="last_name"
            change={changehandler}
            hints={null}
            setvalue={Formdata?.last_name}
            placeholder="enter last name"
            valid={true}
          />
          <div className="form_element">
            <label className="label">gender</label>
            <select onChange={changehandler} name="gender" title="gender" value={Formdata?.gender || ""}>
              <option value="">Don&apos;t specify</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form_element">
            <label className="label">City</label>
            <select onChange={changehandler} name="city" title="city" value={Formdata?.city || ""}>
              <option value="">Don&apos;t specify</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form_element">
            <label className="label">country</label>
            <input name="country" type="text" value="India" disabled />
          </div>
          <div className="form_element">
            <label className="label">Linkedin</label>
            <input
              name="linkedin"
              type="text"
              onChange={changehandler}
              defaultValue={Formdata?.linkedin || ""}
              placeholder="www.linkedin.com/username"
            />
          </div>
          <div className="form_element">
            <label className="label">Github</label>
            <input
              name="github"
              type="text"
              onChange={changehandler}
              defaultValue={Formdata?.github || ""}
              placeholder="www.github.com/username"
            />
          </div>
        </div>
        <button style={{ marginTop: "1rem" }} type="submit">
          Save
        </button>
        <div className="single_line"></div>
      </form>
    </>
  );
}

export default Personal;
