import Hello from "./page.module.css";

export default function Home() {
    return (
       <div>
           <h1 className={Hello.title}>
               哪吒
               <span className={Hello.highlight}>
                   神话
               </span>
           </h1>
           <img src="微信图片_20250331171054.jpg" alt="1" />
       </div>
    );
}