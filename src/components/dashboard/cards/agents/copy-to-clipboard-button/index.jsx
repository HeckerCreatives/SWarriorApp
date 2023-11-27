// ** React
import { useState } from "react";

// ** Third Party Components
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const CopyToClipboardButton = ({
  text,
  successText = "Copied!",
  buttonText = "Copy to clipboard",
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <MDBBtn onClick={handleCopy} {...props}>
      <MDBIcon far icon="copy" />
      &nbsp;&nbsp;{isCopied ? successText : buttonText}
    </MDBBtn>
  );
};

export default CopyToClipboardButton;
