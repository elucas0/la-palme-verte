import {
  IconBrandHipchat,
  IconConfetti,
  IconPencilHeart,
} from '@tabler/icons-react';
import React from 'react';
import InlineBlocks, { Row } from '@/shared/layout/InlineBlocks.layout';
import BecomeMember from '../adherent/components/BecomeMember.component';
import FAQ from '@/shared/layout/FAQ.layout';
import Button from '@/shared/theme/Button';

/**
 * Page Adhérent
 */
export default function page() {
  const actionsRow: Row[] = [
    {
      icon: <IconPencilHeart size={48} stroke={3} />,
      title: 'Accès à la rédaction d’articles',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      icon: <IconConfetti size={48} />,
      title: 'Accès au canal privé de la communauté',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      icon: <IconBrandHipchat size={48} />,
      title: 'Participation à de nombreuses activités',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
  ];

  const questions = [
    {
      label: 'Est-ce que je peux donner l’argent de l’adhésion en liquide ?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      label: 'J’aimerai adhérer à l’association, comment faire ?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      label:
        'Je viens de souscrire à une adhésion, comment rédiger un article ?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      label: 'Pourquoi l’adhésion n’est-elle pas gratuite ?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      label:
        'J’habite dans un autre pays, est-ce quand même possible d’adhérer ?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
  ];

  return (
    <section>
      <article className="flex flex-col gap-20 items-center mt-28 mb-28 ml-16 mr-16">
        {/* Nos actions */}
        <div className="flex flex-col justify-center text-center gap-6 rounded-3xl section">
          <h3>Pourquoi devenir adhérent ?</h3>
          <p>
            Adhérer à La Palme Verte ce n’est pas seulement soutenir
            l’association
          </p>
        </div>
        <InlineBlocks rows={actionsRow} />
      </article>

      {/* Carrousel des membres */}
      <article className="bg-highlight">
        <BecomeMember
          title="84 personnes ont déjà rejoint l’association"
          subtitle="Pourquoi pas vous ?"
        >
          <Button color="primary" className="w-fit">
            Rejoindre la communauté
          </Button>
        </BecomeMember>
      </article>
      <article className="flex flex-col gap-20 items-center mt-28 mb-28 ml-16 mr-16 section">
        <FAQ
          questions={questions}
          title="Vous avez des questions ?"
          description="Les questions les plus fréquentes sur l’adhésion à l’association"
        />
      </article>
    </section>
  );
}
