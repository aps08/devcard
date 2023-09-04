import Input from "../input/Input";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Callendpoint from "../../utils/Callendpoint";
import { setData } from "../../redux/userinfoSlice";
import Loading from "../../utils/Loading";
import { LANG } from "../../utils/Constants";
import _ from "lodash";

function Professional() {
  const dispatch = useDispatch();
  const [message, setmessage] = useState(false);
  const [error, seterror] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const userdata = useSelector((state) => state.userInfo?.professional);
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

  const professionalhandler = async (event) => {
    event.preventDefault();
    seterror(false);
    if (!_.isEqual(Formdata, userdata)) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("put", "/user/professional", null, Formdata, true);
      if (statuscode === 200) {
        setmessage(data.message);
        dispatch(setData({ key: "professional", value: data.data }));
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
    }
  };

  return (
    <>
      <Loading spinner={submitted} />
      <form id="professionaldetails" onSubmit={professionalhandler}>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <h2 className="mb-1 para">Professional details</h2>
        <div className="user_name">
          <Input
            label="Company"
            name="company_name"
            change={changehandler}
            hints={null}
            type="text"
            setvalue={Formdata?.company_name || ""}
            placeholder="enter company name"
            valid={true}
          />
          <Input
            label="Role"
            name="professional_role"
            change={changehandler}
            hints={null}
            type="text"
            setvalue={Formdata?.professional_role || ""}
            placeholder="enter your role"
            valid={true}
          />
          <Input
            label="Experience"
            change={changehandler}
            hints={null}
            type="number"
            placeholder="enter experience(in years)"
            valid={true}
            setvalue={Formdata?.experience || 0}
          />
          <div className="form_element">
            <label className="label">Primary language</label>
            <select
              onChange={changehandler}
              name="primary_pl"
              title="Primary language"
              value={Formdata?.primary_pl || ""}>
              <option value="">Don&apos;t specify</option>
              {LANG.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button style={{ marginTop: "1rem" }} type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default Professional;
