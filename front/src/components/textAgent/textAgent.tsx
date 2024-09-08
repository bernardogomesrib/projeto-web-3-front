"use client"
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export const FormatText = (text: string) => {
    if (!text) {
        return <div></div>;
    }
    return text.split(/\r?\n/).map((line, index) => (
        <React.Fragment key={index}>
            {DefiningText(line)}
        </React.Fragment>
    ));
};

export const DefiningText = (text: string) => {
    if (!text) {
        return <div></div>
    }
   

    if (text[0] === '>') {
        if (text[1] === ">" && text[2] === ">") {
            return (<div>{text}</div>)
        } else if (text[1] === ">") {
            text = text.replace(">>", "");
            return (<span className="text-blue-500"  onClick={() => handleScrollToElement(text + "cardid")}>{hoverCard(`${text}cardid`,text)}</span>)
        } else {
            return (<div className="text-[var(--greenText)]">{text}</div>)
        }
    } else {
        return (<div>{text}</div>)
    }
}


const hoverCard = (id: string,text:string) => {
    
    const [Target,setTarget] = useState(document.getElementById(id))
    useEffect(() => {
        setTarget(document.getElementById(id));
    },[id])
    
    if (Target) {
        return (
        <HoverCard>
            <HoverCardTrigger className="flex flex-row">{">>"}{text}</HoverCardTrigger>
            <HoverCardContent>
                <HtmlStringComponent htmlString={Target.innerHTML} />
            </HoverCardContent>
        </HoverCard>)
    }else{
        return <div className="line-through flex flex-row">{">>"}{text}</div>
    }
}

interface HtmlStringComponentProps {
    htmlString: string;
  }
  
  const HtmlStringComponent: React.FC<HtmlStringComponentProps> = ({ htmlString }) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    );
  };


const handleScrollToElement = (id: string) => {
    const offset = window.innerHeight * 0.3;
    const target = document.getElementById(id);
    let offsetPosition = 0;
    const scrollDuration = 600;
    if (target) {

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });

        setTimeout(() => {
            const elementPosition = target.getBoundingClientRect().top;
            offsetPosition = window.scrollY + elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }, scrollDuration);
        setTimeout(() => {

            window.scrollTo({
                top: offsetPosition - 15,
                behavior: 'smooth',
            });

            setTimeout(() => {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }, 200);
        }, 200);
    }
};