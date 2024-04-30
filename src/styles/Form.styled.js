import { styled } from "styled-components";
import { FormControl, FormLabel, InputGroup } from "react-bootstrap";

export const FormControlStyled = styled(FormControl)`
  width: 400px;
  border: 2px solid #8bbb97;
  border-radius: 0 10px 10px 0;
  padding: 10px;
  outline: none;
`;

export const FormSelectStyled = styled.select`
  width: 100%;
  letter-spacing: 0.03em;
  padding: 12px;

  & option {
    letter-spacing: 0.03em;
  }
`;

export const SendQuestionFormStyled = styled(FormControl)`
  flex: 1;
`;

export const InputGroupStyled = styled(InputGroup)`
  #basic-addon1 {
    border: 2px solid #8bbb97;
    border-right: none;
    border-radius: 10px 0 0 10px;
    background-color: transparent;
  }

  #basic-addon1 svg {
    color: #000;
    width: 20px;
    height: 20px;
  }
`;

export const SendQuestionContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  letter-spacing: 0.03em;
`;

export const FormSelectLabelStyled = styled(FormLabel)`
  padding: 0;
  margin-bottom: 5px;
  color: #212529b0;
`;
