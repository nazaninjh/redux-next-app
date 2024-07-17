import style from './../page.module.css';

export default function SingleBlogSkeleton() {
  return (
    <section className={style.cardContainer}>
        <article className={style.skeletonCard}>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </article>
    </section>
  )
}
