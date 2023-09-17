"use client";
import { Accordion, AccordionItem, cn } from "@nextui-org/react";
import { Button } from "@/shared/theme/Button";

// TODO: Faire un fichier de type dédié
interface QuestionFAQ {
  title: string;
  content: string;
}

interface FAQProps {
  questions: QuestionFAQ[];
  title?: string;
  description?: string;
  className?: React.ComponentProps<"div">["className"];
}

/**
 * Questions fréquemment posés
 * @param questions Questions à afficher
 * @param title Titre de la section *(optionnel)*
 * @param description Description de la section
 * @param className Classe tailwind à ajouter *(optionnel)*
 */
export default function FAQ({
  questions,
  title = "Vous avez des questions ?",
  description = "Les questions que l'on nous pose le plus souvent",
  className,
}: FAQProps) {
  return (
    <div className={cn("section flex flex-col py-16 gap-14 max-w-7xl w-full", className)}>
      <div className="flex flex-col gap-4 items-center text-center">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <Accordion variant="bordered">
        {questions.map(({ title, content }, index) => (
          <AccordionItem
            key={index}
            aria-label={`Accordion ${index}`}
            title={title}
            classNames={{ title: "font-body", indicator: "text-medium" }}
          >
            {content}
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-4 text-center">
          <h4>
            Encore des questions ?
          </h4>
          <p>
            Envoyez-nous un message, nous vous répondrons dans les plus brefs
            délais
          </p>
        </div>
        <Button color="secondary" className="text-accent w-fit">
          Contactez-nous
        </Button>
      </div>
    </div>
  );
}
