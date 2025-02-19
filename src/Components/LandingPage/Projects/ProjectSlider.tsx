import { useLayoutEffect, useState } from "react";
import React from "react";

export default function ProjectSlider(props:{
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>
}) {
  const {setBackgroundImage} = props
  const [selected, setSelected] = useState("project-slider-button-id-0");
  const projects: Project[] = [
    {
      name: "InstatDataView",
      version: "1.0",
      stack: ["React JS", "Laravel 13", "MySql"],
      image: "instatdataview.png",
      backgroundImage: "instatdataview.png"
    }, 
    {
      name: "desktop",
      version: "1.0",
      stack: ["React JS", "Laravel 13", "MySql"],
      image: "desktop.svg",
      backgroundImage: "desktop.svg"
    },
  ];
  const [focusedProject, setFocusedProject] = useState<Project>(projects[0]);
  useLayoutEffect(()=>{
    setBackgroundImage(focusedProject.backgroundImage || "");
  }, [focusedProject])
  return (
    <div>
      <div className="p-7 w-full flex-col flex items-center">
        <div className="h-[300px] w-[300px] rounded-xl">
          <img
            src={"/images/projects/" + focusedProject.image}
            alt=""
            className="w-full h-full shadow-lg rounded-xl"
          />
        </div>
        <p className="my-3 text-xl">{focusedProject.name}</p>
      </div>
      <div className="flex bg-white flex-row gap-3 w-full p-3">
        {projects.map((item, i) => (
          <ProjectSliderButton
            key={"project-slider-button-id-" + i}
            id={"project-slider-button-id-" + i}
            project={item}
            setFocusedProject={setFocusedProject}
            selected={"project-slider-button-id-"+i == selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectSliderButton(props: {
  project: Project;
  setFocusedProject: React.Dispatch<React.SetStateAction<Project>>;
  selected: boolean,
  id: string,
  setSelected: React.Dispatch<React.SetStateAction<string>>
}) {
  const { project, setFocusedProject,id , setSelected, selected } = props;
  return (
    <div
      className="relative hover:brightness-50 rounded-lg w-[100px] h-[100px] bg-[#2e2e2e]"
      style={{
        border: selected ? "2px solid red" : ""
      }}
      onClick={() => {
        setSelected(id);
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
