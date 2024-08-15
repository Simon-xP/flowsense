import styled from "styled-components";
import Paragraph from "./Paragraph";
import { useNavigate } from "react-router-dom";
import List from "./List";
import Navbar from "./Navbar"; 

const Landing = () => {
  const navigate = useNavigate();
  const features = [
    "Indicates reading progress so users can quickly identify what they have already read.",
    "Provides contextual explanations for individual sentences using GPT.",
    "Visualizes reading progress.",
    "Allows users to add their own notes, breaking paragraphs for easier reading.",
    "Highlights significant sentences for easy reference.",
  ];

  return (
    <Container>
      <Navbar />
      <StyledContainer>
        <h1>FlowSense</h1>
        <h2>Optimize Your Reading Experience</h2>

        <div className="content-container">
        <div className="button-container">
          <StyledButton onClick={() => navigate("/login")}>Log In</StyledButton>
          <StyledButton onClick={() => navigate("/sign up")}>Sign Up</StyledButton>
        </div>

        <div class="video-container">
        <iframe src="https://www.youtube.com/embed/doTMUdBBq7A?si=ZkA20KQC38kI63TA" 
          title="YouTube video player" 
          allowfullscreen></iframe>
        </div>
        </div>
      </StyledContainer>

      <Paragraph
        header="What is FlowSense?"
        description="FlowSense is an innovative reading tool designed to assist users in dissecting complex information more efficiently. By leveraging interactive, visual, and assistive features, FlowSense helps users stay focused and engaged while reading advanced reports, textbooks, news articles, and more."
      />
      <Paragraph
        header="Why FlowSense?"
        description="At FlowSense, our team is dedicated to enhancing your reading experience. During our internships and professional experiences, we frequently encountered challenges in digesting extensive and intricate reports. We realized that traditional reading methods were not sufficient to keep up with the pace and volume of information we needed to process."
      />
      <List header="Our Key Features" listItems={features} />
    </Container>
  );
};

export default Landing;

const Container = styled.div``; // Redundant

const StyledContainer = styled.div`
  padding: 60px;
  background: #62ABD9;

  h1 { 
    margin: 50px 0 0 0;
    font-size: 140px;
    font-weight: 900;
    color: #181C96;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  h2 {
    font-size: 36px;
    font-weight: 700;
    margin-top: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    color: #181C96; 
  }

  .button-container {
    display: flex;
    flex-direction: column;
    padding: 8px 5px; 
    align-items: flex-start;
    gap: 5px; /*Spacing between buttons*/
  }

  .content-container {
    display: flex;
    align-items: center; /* Aligns items vertically in the center */
    justify-content: space-between; /* Puts space between the buttons and the video */
    gap: 20px; /* Adds spacing between buttons and video */
    margin-top: 30px; /* Optional: Adds some spacing above */
  }

  .video-container {
    width: 560px; 
    height: 315px; 
  }
  
  iframe {
  width: 100%;
  height: 100%;
  border: none;
  }
`;

const StyledButton = styled.button`
  background: linear-gradient(
    45deg,
    #87CEFA, /* Light Sky Blue */
    #00BFFF, /* Sky Blue */
    #00B2EE, /* Deep Sky Blue */
    #48D1CC, /* Medium Turquoise */
    #40E0D0  /* Turquoise */
  );
  background-size: 200% 200%;
  animation: gradientAnimation 4s ease infinite;
  border: 3px solid #181C96;
  border-radius: 50px; /* rounded corners */
  color: #181C96;
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.3s ease, 
  box-shadow 0.3s ease;
  margin: 10px;
  width: 200px; /* Set explicit width */
  height: 70px; /* Set explicit height */
  

  &::before,
  &::after {
    content: '✨';
    position: absolute;
    font-size: 30px;
    opacity: 0;
  }

  &:hover::before {
    content: '✨'; /* Adding two sparkle emojis on the top-left */
    left: -10px;
    top: -10px;
    font-size: 30px;
    opacity: 0.8;
        }

  &:hover::after {
    content: '✨'; /* Adding two sparkle emojis on the bottom-right */
    right: -10px;
    bottom: -10px;
    font-size: 30px;
    opacity: 0.8;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;