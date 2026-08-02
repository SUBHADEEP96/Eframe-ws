import { Plus } from "lucide-react";
export function FAQ({ items }: { items: readonly { question: string; answer: string }[] }) {
  return <div className="faq-list">{items.map((item) => <details className="faq-item" key={item.question}><summary><span>{item.question}</span><Plus /></summary><p>{item.answer}</p></details>)}</div>;
}
