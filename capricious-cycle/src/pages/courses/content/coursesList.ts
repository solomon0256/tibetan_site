//src/pages/courses/content/coursesList.ts
// This file contains a list of courses with their titles, categories, and slugs.
// 统一课程数据与组件的配置
import IntroTibetan from '../../../components/courses/IntroTibetan.astro';
import TibetanCustoms from '../../../components/courses/TibetanCustoms.astro';

export const courseList = [
  {
    title: '藏语入门课程',
    category: '语言',
    slug: 'intro-tibetan',
    component: IntroTibetan,
  },
  {
    title: '西藏民俗概览',
    category: '文化',
    slug: 'tibetan-customs',
    component: TibetanCustoms,
  },
];