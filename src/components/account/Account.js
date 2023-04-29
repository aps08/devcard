import Input from "../input/Input";
import "./Account.css";
// [add credits, show credits history][You have 0 devcard credits.]
// Contribute
// [switch to contribution mode] [learn, build and earn credits]
function Account() {
  const email = "8anoopsinngh@gmail.com";
  return (
    <div className="account">
      <h2 className="mb-1">Email settings</h2>
      <form id="change_email">
        <Input
          label="Email"
          className="occupy_two"
          type="email"
          setvalue={email}
          change={null}
          hints={null}
          valid={true}
        />
        <button type="submit">change email</button>
      </form>
      <div className="single_line"></div>
      <h2 className="mb-1">Credits</h2>
      <p style={{ marginLeft: ".4rem" }}>You have 0 devcard credits.</p>
      <div className="privacy_item form_element">
        <button>Buy credits</button>
      </div>
      <div className="single_line"></div>
      <form id="change_password">
        <h2 className="mb-1">Security settings</h2>
        <div className="user_name">
          <Input
            label="Old passsword"
            change={null}
            hints={null}
            type="password"
            placeholder="enter old password"
            valid={true}
          />
          <Input
            label="new password"
            change={null}
            hints={null}
            type="password"
            placeholder="enter new password"
            valid={true}
          />
        </div>
        <button type="submit">Change password</button>
      </form>
      <div className="single_line"></div>
      <h2 className="mb-1">Privacy settings</h2>
      <div className="privacy">
        <div className="privacy_item form_element">
          <button>Delete account</button>
          <p className="para">Your account will be deleted instantly, and you won&apos;t be able to recover it.</p>
        </div>
        <div className="privacy_item form_element">
          <button>Export data</button>
          <p className="para">Your data will be delivered to you registered email.</p>
        </div>
        <div className="privacy_item form_element">
          <button>Contributor mode</button>
          <p className="para">Become a contributor. Learn, build and earn credits</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
