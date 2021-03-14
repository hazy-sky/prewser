import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Alert } from "baseui/icon";
import { Input } from "baseui/input";
import { validate as validateEmail } from "email-validator"; // add this package to your repo: `$ yarn add email-validator`
import * as React from "react";

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}
export const Email = ({
  label,
  defaults,
  answers,
  setAnswers,
  id,
}: {
  label: string;
  defaults: string;
  answers?: any;
  setAnswers?: any;
  id?: any;
}) => {
  // const {
  //   connectors: { drag },
  // } = useNode();

  const [value, setValue] = React.useState<any>(defaults);
  const [isValid, setIsValid] = React.useState(false);
  const [isVisited, setIsVisited] = React.useState(false);
  const shouldShowError = !isValid && isVisited;
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setIsValid(validateEmail(value));
    setValue(value);
    let nanswers = { ...answers };
    nanswers[id] = value;
    setAnswers({ ...nanswers });
  };

  return (
    <Block
      // ref={drag}
      width="70%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <FormControl
        label={label}
        error={shouldShowError ? "Please input a valid email address" : null}
      >
        <Input
          id="input-id"
          value={value}
          onChange={onChange}
          onBlur={() => setIsVisited(true)}
          error={shouldShowError}
          overrides={shouldShowError ? { After: Negative } : {}}
        />
      </FormControl>
    </Block>
  );
};
