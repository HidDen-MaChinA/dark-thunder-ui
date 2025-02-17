import { useState } from "react";
import React from "react";

export default function ProjectSlider() {
  const projects: Project[] = [
    {
      name: "InstatDataView",
      version: "1.0",
      stack: ["React JS", "Laravel 13", "MySql"],
      image: "instatdataview.png",
    }, 
    {
      name: "desktop",
      version: "1.0",
      stack: ["React JS", "Laravel 13", "MySql"],
      image: "desktop.svg",
    },
  ];
  const [focusedProject, setFocusedProject] = useState<Project>(projects[0]);
  return (
    <div>
      <div className="p-7 w-full flex-col flex items-center">
        <div className="h-[400px] w-[400px] bg-[#131313] rounded-lg">
          <img
            src={"/images/projects/" + focusedProject.image}
            alt=""
            className="w-full h-full shadow-lg rounded-lg"
          />
        </div>
        <p className="my-3 text-xl">{focusedProject.name}</p>
      </div>
      <div className="flex flex-row gap-3 w-full p-3 bg-[#00000060]">
        {projects.map((item, i) => (
          <ProjectSliderButton
            key={"project-slider-button-id-" + i}
            project={item}
            setFocusedProject={setFocusedProject}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectSliderButton(props: {
  project: Project;
  setFocusedProject: React.Dispatch<React.SetStateAction<Project>>;
}) {
  const { project, setFocusedProject } = props;
  return (
    <div
      className="relative hover:brightness-50 rounded-lg w-[100px] h-[100px] bg-[#2e2e2e]"
      onClick={() => {
        setFocusedProject(project);
      }}
    >
      <img
        src={"/images/projects/" + project.image}
        className="w-full rounded-lg h-full"
        alt="icon"
      />
    </div>
  );
}

type Project = {
  name: string;
  image?: string;
  backgroundImage?: string;
  version: string;
  stack: string[];
  description?: string;
};
