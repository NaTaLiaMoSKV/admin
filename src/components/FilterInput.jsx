import { InputGroup } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { FormControlStyled, InputGroupStyled } from "styles/Form.styled";

const FilterInput = ({ value, setValue, ...props }) => (
  <InputGroupStyled className="mb-3" {...props}>
    <InputGroup.Text id="basic-addon1">
      <MdSearch />
    </InputGroup.Text>
    <FormControlStyled
      style={{ maxWidth: "400px" }}
      placeholder="Enter the filter text"
      aria-label="filter"
      aria-describedby="basic-addon1"
      type="text"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      autoComplete="off"
    />
  </InputGroupStyled>
);

export default FilterInput;
