import Avatar from "react-avatar";

const Avatars = (props) => {
  const { name, textSizeRatio, size } = props;

  return (
    <Avatar
      name={name}
      textMarginRatio={0.1}
      color="#417dfd"
      round="10px"
      textSizeRatio={textSizeRatio}
      size={size}
      {...props}
    />
  );
};

export default Avatars;
