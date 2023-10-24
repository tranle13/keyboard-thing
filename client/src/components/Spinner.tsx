import styled, { keyframes } from "styled-components";

export const Spinner = () => {
  return (
    <>
      <Container>
        <Dot1 />
        <Dot2 />
        <Dot3 />
      </Container>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

// SECTION = styled-components
const index = keyframes`
  0%, 100% {z-index: 3}
  33.3% {z-index: 2}
  66.6% {z-index: 1}
`;
const rotateMove = keyframes`
  55% { transform: translate(-50%, -50%) rotate(0deg); }
  80% { transform: translate(-50%, -50%) rotate(360deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;
const dot1Move = keyframes`
  20% { transform: scale(1); }
  45% { transform: translate(14%, 8%) scale(0.45); }
  60%, 80% { transform: translate(85%, 57%) scale(0.45); }
  100% { transform: translateY(0px) scale(1); }
`;
const dot2Move = keyframes`
  20% { transform: scale(1); }
  45% { transform: translate(-14%, 8%) scale(0.45); }
  60%, 80% { transform: translate(-85%, 57%) scale(0.45); }
  100% { transform: translateY(0px) scale(1); }
`;
const dot3Move = keyframes`
  20% { transform: scale(1); }
  45% { transform: translateY(-17%) scale(0.45); }
  60%, 80% { transform: translateY(-99%) scale(0.45); }
  100% { transform: translateY(0px) scale(1); }
`;

const Container = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  filter: url("#goo");
  animation: ${rotateMove} 2s ease-in-out infinite;
`;

const Dot = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Dot1 = styled(Dot)`
  background-color: #ffe386;
  animation: ${dot1Move} 2s ease infinite, ${index} 6s -2s ease infinite;
`;

const Dot2 = styled(Dot)`
  background-color: #10beae;
  animation: ${dot2Move} 2s ease infinite, ${index} 6s -4s ease infinite;
`;

const Dot3 = styled(Dot)`
  background-color: #f74d75;
  animation: ${dot3Move} 2s ease infinite, ${index} 6s ease infinite;
`;
