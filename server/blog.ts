'use server';
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-call -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-return -- API de Notion mal typé */
import { BlogPost } from '@/class/BlogPost.class';
import { clone } from '@/utils/utils';
import {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';

const databaseId = process.env.BLOG_DATABASE ?? '';

export interface GetArticlesResponse {
  articles: BlogPost[];
  hasMore: boolean;
  nextArticle: string | undefined;
}

/**
 * Récupère les articles de blog avec une pagination
 * @param category Catégorie des articles à récupérer
 * @param lastArticleId Indice du dernier article à partir duquel récupérer le reste
 * @returns Liste des articles
 */
export const getArticles = async (
  category?: string | null,
  lastArticleId?: string,
  maxArticlesProps?: number,
): Promise<GetArticlesResponse> => {
  const maxArticles =
    maxArticlesProps || Number(process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE);
  try {
    const response = await notionClient.databases.query({
      filter: {
        and: [
          {
            property: 'État',
            status: {
              equals: 'Publié',
            },
          },
          category
            ? {
                property: 'Catégories',
                multi_select: {
                  contains: category,
                },
              }
            : {
                or: [],
              },
        ],
      },
      start_cursor: lastArticleId,
      page_size: maxArticles,
      database_id: databaseId,
    });

    const blogPostsPromises = await Promise.all(
      response.results
        .filter(
          (result): result is PageObjectResponse => 'properties' in result,
        )
        .map(async (result) => {
          try {
            return Promise.resolve(BlogPost.fromNotion(result));
          } catch (error) {
            return null;
          }
        }),
    );
    return {
      articles: clone(
        blogPostsPromises.filter(
          (blogPost): blogPost is BlogPost => blogPost !== null,
        ),
      ),
      hasMore: response.has_more,
      nextArticle: response.next_cursor ?? undefined,
    };
  } catch (error) {
    return { articles: [], hasMore: false, nextArticle: undefined };
  }
};

/**
 * Retourne les articles de blog correspondant à un texte
 * @param text Texte à rechercher
 * @returns Articles correspondant
 */
export const getArticlesByText = async (text: string) => {
  const response = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: 'État',
          status: {
            equals: 'Publié',
          },
        },
        {
          or: [
            {
              property: 'Titre',
              title: {
                contains: text,
              },
            },
            {
              property: 'Description',
              rich_text: {
                contains: text,
              },
            },
          ],
        },
      ],
    },
    database_id: databaseId,
  });

  const blogPostsPromises = response.results.map((result) =>
    BlogPost.fromNotion(result as PageObjectResponse),
  );
  const articles = clone(await Promise.all(blogPostsPromises));
  return articles;
};

/**
 * Récupérer toutes les catégories des articles disponibles
 */
export const getCategories = async () => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'État',
      status: {
        equals: 'Publié',
      },
    },
    database_id: databaseId,
  });

  const categories = (response.results as PageObjectResponse[]).map((result) =>
    (result.properties.Catégories as any).multi_select.map(
      (category: { id: string; name: string; color: string }) => ({
        name: category.name,
      }),
    ),
  );

  return Array.from(
    new Set(categories.flat().map((category) => category.name)),
  ) as string[];
};

/**
 * Récupérer le contenu d'une page d'article
 * @param pageId Identifiant de la page
 * @returns Contenu de la page
 */
export const getPageContent = async (pageId: string) => {
  const response = await notionClient.blocks.children.list({
    block_id: pageId,
  });

  return response.results as BlockObjectResponse[];
};

/**
 * Récupérer un article par son URL
 * @param url URL de l'article
 * @returns Article retrouvé
 */
export const getPageByUrl = async (url: string) => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'URL',
      rich_text: {
        equals: url,
      },
    },
    database_id: databaseId,
  });

  return BlogPost.fromNotion(response.results[0] as PageObjectResponse);
};
