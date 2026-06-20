import PageWrapper from "../components/UI/PageWrapper";
import { useNavigate } from "react-router-dom";
import BtnAsText from "../components/UI/BtnAsText";

export default function Feed() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div>FEED</div>
      <BtnAsText onClick={() => navigate(-1)}>Back</BtnAsText>
      <BtnAsText onClick={() => navigate("/")}>Home</BtnAsText>
    </PageWrapper>
  );
}
