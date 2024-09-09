"use client"
import React, { useCallback, useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export const FormatText = (text: string) => {
    if (!text) {
        return <div></div>;
    }

    return text.split(/\r?\n/).map((line, index) => (
        <React.Fragment key={index}>
            <DefiningText text={line} />
        </React.Fragment>
    ));
};

export const DefiningText = ({ text }: { text: string }) => {
    const [Target, setTarget] = useState<HTMLElement | null>(null);
    const [cardPost, setCardPost] = useState<any>(null);

    const redefiningTarget = useCallback(() => {
        if (text.startsWith(">>")) {
            const nt = text.replace(">>", "");
            const ntt = `${nt}cardid`;
            const targetElement = document.getElementById(ntt);
            setTarget(targetElement);

            if (targetElement) {
                setCardPost(
                    <HoverCard>
                        <HoverCardTrigger className="flex flex-row">{text}</HoverCardTrigger>
                        <HoverCardContent>
                            <HtmlStringComponent htmlString={targetElement.innerHTML} />
                        </HoverCardContent>
                    </HoverCard>
                );
            } else {
                setCardPost(<div className="line-through flex flex-row">{text}</div>);
            }
        }
    }, [text]);

    useEffect(() => {
        redefiningTarget();
    }, [redefiningTarget]);

    function retornos() {
        const nt = text.replace(">>", "");
        const otherTest = Number(nt);
    
        if (text.startsWith('>>') && !isNaN(otherTest)) {
            return (
                <span className="text-blue-500" onMouseOver={redefiningTarget} onClick={() => handleScrollToElement(`${nt}cardid`)}>
                    {cardPost}
                </span>
            );
        } else if (text.startsWith('>')) {
            return <div className="text-[var(--greenText)]">{text}</div>;
        } else {
            return <div>{text}</div>;
        }
    }
    

    return retornos();
};

interface HtmlStringComponentProps {
    htmlString: string;
}

const HtmlStringComponent: React.FC<HtmlStringComponentProps> = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);

const handleScrollToElement = (id: string) => {
    const offset = window.innerHeight * 0.3;
    const target = document.getElementById(id);
    let offsetPosition = 0;
    const scrollDuration = 600;
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            const elementPosition = target.getBoundingClientRect().top;
            offsetPosition = window.scrollY + elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }, scrollDuration);

        setTimeout(() => {
            window.scrollTo({ top: offsetPosition - 15, behavior: 'smooth' });

            setTimeout(() => {
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }, 200);
        }, 200);
    }
};
