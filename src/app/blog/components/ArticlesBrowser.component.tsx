'use client';
import { Pagination, ScrollShadow } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/tabs';
import Searchbar from './Searchbar.component';
import Reveal from '@/shared/utils/Reveal.component';
import Article from './Article.component';
import { BlogPost } from '@/class/BlogPost.class';
import { Key, useState } from 'react';

interface ArticleBrowerProps {
  articles: BlogPost[];
  categories: string[];
}

export default function ArticlesBrowser({ articles, categories }: ArticleBrowerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 3;


  const handleSearchChange = (value: string) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleCategorySelection = (category: string | null) => {
    setSelectedCategory(category === "Tout" ? null : category);
  };

  const paginate = (pageNumber: number) => { setCurrentPage(pageNumber); };

  const filterAndPaginateArticles = () => {
    const filteredArticles = articles.filter(article => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const inCategory = !selectedCategory || article.categories.includes(selectedCategory);
      const matchesQuery =
        !searchQuery ||
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.description.toLowerCase().includes(lowerCaseQuery);
      return inCategory && matchesQuery;
    });

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    return currentArticles;
  };

  const currentArticles = filterAndPaginateArticles();

  return (
    <section className="flex flex-col gap-10 section w-full">
      {/* <h3>Découvrir</h3> */}
      <div className="flex flex-wrap justify-between gap-5 overflow-x-hidden ">
        <ScrollShadow orientation='horizontal' className='flex items-center h-16'>
          <Tabs
            variant="light"
            color="secondary"
            radius="full"
            classNames={{
              tabList: 'gap-6',
              cursor: 'bg-accent',
            }}
            onSelectionChange={(key: Key) => {
              handleCategorySelection(key as string);
            }}
          >
            <Tab key={"Tout"} title={"Tout"} />
            {categories.map((category) => (
              <Tab
                key={category}
                title={category}
              />
            ))}
          </Tabs>
        </ScrollShadow>
        <div className="max-w-[400px] w-full">
          <Searchbar onSearchChange={handleSearchChange} />
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-8">
        {currentArticles.map((article, index) => (
          <Reveal index={index} key={article.title}>
            <Article article={article} />
          </Reveal>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          initialPage={1}
          total={Math.ceil(currentArticles.length / articlesPerPage)}
          onChange={paginate}
        />
      </div>
    </section>
  );
}
