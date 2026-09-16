"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { normalizeSuccessStoryCategory, successStoryCategories, type SuccessStoryCategory } from "@/lib/success-story-categories";
import type { SuccessStory } from "../data/homepage-sections";

function StoryGrid({ stories, category }: { stories: SuccessStory[]; category: SuccessStoryCategory }) {
  if (!stories.length) {
    return <Card className="border-dashed bg-background/60 py-10 text-center shadow-none"><CardContent><p className="font-medium">No published stories in {category} yet.</p><p className="mt-2 text-sm text-muted-foreground">Please check back as we add more client work.</p></CardContent></Card>;
  }
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {stories.map((story) => (
        <Card key={story.id} className="group min-w-0 overflow-hidden py-0 shadow-sm transition-shadow hover:shadow-xl">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image src={story.image} alt={story.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 motion-reduce:transition-none group-hover:scale-[1.03] motion-reduce:group-hover:scale-100" />
          </div>
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center gap-2"><Badge>{category}</Badge><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{story.client}</span></div>
            <CardTitle className="text-xl leading-snug">{story.title}</CardTitle>
            <CardDescription className="line-clamp-3 leading-6">{story.excerpt}</CardDescription>
          </CardHeader>
          <CardContent />
          <CardFooter><Button variant="ghost" nativeButton={false} render={<Link href={story.href ?? `/success-stories/${story.slug}`} />}>Read story <ArrowRight data-icon="inline-end" /></Button></CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function SuccessStoriesSection({ stories }: { stories: SuccessStory[] }) {
  const [activeCategory, setActiveCategory] = useState<SuccessStoryCategory>(successStoryCategories[0]);
  const normalized = stories.map((story) => ({ story, category: normalizeSuccessStoryCategory(story.category) })).filter((item): item is { story: SuccessStory; category: SuccessStoryCategory } => item.category !== null);
  return (
    <section className="bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_10%,var(--background)),var(--background)_55%,color-mix(in_oklab,var(--primary)_5%,var(--background)))] py-20 sm:py-28" aria-labelledby="stories-heading">
      <div className="section-shell">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"><Badge variant="outline">Selected work</Badge><h2 id="stories-heading" className="display-title uppercase">Our success stories</h2><p className="section-copy">Explore how ideas, technology and thoughtful design become measurable experiences for enterprise teams.</p></div>
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as SuccessStoryCategory)} className="mt-10 gap-8">
          <div className="overflow-x-auto pb-2"><div className="flex w-max min-w-full justify-start sm:justify-center"><TabsList>{successStoryCategories.map((category) => <TabsTrigger key={category} value={category} className="min-h-11 px-4">{category}</TabsTrigger>)}</TabsList></div></div>
          {successStoryCategories.map((category) => <TabsContent key={category} value={category}><StoryGrid category={category} stories={normalized.filter((item) => item.category === category).map((item) => item.story)} /></TabsContent>)}
        </Tabs>
        <div className="mt-10 text-center"><Button variant="outline" nativeButton={false} render={<Link href="/success-stories" />}>View all success stories <ArrowRight data-icon="inline-end" /></Button></div>
      </div>
    </section>
  );
}
