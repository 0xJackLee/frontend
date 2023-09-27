import React from "react";
import ContributorList from "@site/src/components/ContributorList";
import Translate from "@docusaurus/Translate";

const ContributorSection = () => {
  return (
    <div className="flex items-center justify-center w-full py-[96px] bg-background-faint">
      <div className="flex flex-col justify-center w-full px-8 md:flex-row md:justify-between md:w-[1224px]">
        <div className="flex flex-col items-center flex-shrink-0 mb-8 md:items-start">
          <div className="flex items-center gap-1">
            <div className="text-[32px]">🍇</div>
            <h2 className="font-bold font-ubuntu text-content text-[42px]">
              <Translate id="home.contributors.title">贡献者</Translate>
            </h2>
          </div>
          <div className="mt-4 text-sm">
            <Translate id="home.contributors.intro">
              分享是最好的学习方法
            </Translate>
          </div>
        </div>

        <div className="flex">
          <ContributorList />
        </div>
      </div>
    </div>
  );
};

export default ContributorSection;
