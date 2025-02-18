import style from './../page.module.css';

export default function BlogPageSkeleton() {
  const numbers = [1, 2, 3, 4, 5, 6]
  return (
    <section className={style.cardContainer}>
      {numbers.map(num => {
        return <article className={style.skeletonCard}>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </article>
      })}
    </section>
  )
}
