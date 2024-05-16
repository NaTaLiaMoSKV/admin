import { SectionDescription, SectionTitle } from "../Homepage.styled";
import {
  BenefitsImageWrapper,
  BenefitsItem,
  BenefitsList,
  ExploreContainer,
  TitleContainer,
} from "./Benefits.styled";
import { SectionContainer } from "styles/Section.styled";

import effIcon from "images/efficiency.png";
import flexIcon from "images/flexibility.png";
import engIcon from "images/engagement.png";
import anIcon from "images/analytics.png";

const Benefits = () => {
  return (
    <section>
      <SectionContainer>
        <ExploreContainer>
          <p>Explore Now</p>
        </ExploreContainer>
        <div className="pt-4 pb-4">
          <SectionDescription>Benefits</SectionDescription>
          <TitleContainer>
            <SectionTitle attr="benefits">
              What Makes Us the Preferred Choice?
            </SectionTitle>
            <p className="subtitleText">
              Discover why learners choose us. Our comprehensive approach blends
              cutting-edge technology with personalized support.{" "}
            </p>
          </TitleContainer>
          <BenefitsList>
            <BenefitsItem>
              <BenefitsImageWrapper>
                <img src={effIcon} alt="Efficiency"></img>
              </BenefitsImageWrapper>
              <h3>Efficiency</h3>
              <p>
                LMS enhances learning efficiency with organized content,
                automated assessments, and instant feedback{" "}
              </p>
            </BenefitsItem>
            <BenefitsItem>
              <BenefitsImageWrapper>
                <img src={flexIcon} alt="Flexibility"></img>
              </BenefitsImageWrapper>
              <h3>Flexibility</h3>
              <p>
                Enjoy learning anytime, anywhere with LMS, facilitating
                self-paced study and personalized learning paths{" "}
              </p>
            </BenefitsItem>
            <BenefitsItem>
              <BenefitsImageWrapper>
                <img src={engIcon} alt="engagement"></img>
              </BenefitsImageWrapper>
              <h3>Engagement</h3>
              <p>
                Foster active engagement through interactive multimedia,
                discussion forums, and gamified elements{" "}
              </p>
            </BenefitsItem>
            <BenefitsItem>
              <BenefitsImageWrapper>
                <img src={anIcon} alt="analytics"></img>
              </BenefitsImageWrapper>
              <h3>Analytics</h3>
              <p>
                Harness powerful analytics to track learner progress, identify
                trends, and optimize course outcomes{" "}
              </p>
            </BenefitsItem>
          </BenefitsList>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Benefits;
