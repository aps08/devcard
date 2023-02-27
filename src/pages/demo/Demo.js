import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import './Demo.css';

const Demo = () => {
  return (
    <>
      <div className="progress-bar">
        <div style={{ width: '10%' }} className="bar"></div>
      </div>
      <div className="demo-form">
        <h3>
          Get started by filling out the exciting form below and create your
          very own demo developer card!
        </h3>
        <form>
          <Input name="First name" required={true} />
          <Select />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Demo;
