$(function() {
  function generateTOC() {
    const $content = $(".area_view");
    const $toc = $("#toc");

    if ($content.length === 0 || $toc.length === 0) return;

    const headings = $content.find("h2");
    if (headings.length === 0) return;

    $toc.empty();

    headings.each(function(index) {
      const $h2 = $(this);
      let id = $h2.attr("id");
      if (!id) {
        id = "section-" + (index + 1);
        $h2.attr("id", id);
      }

      const text = $h2.text().trim();
      const $li = $("<li></li>");
      const $a = $("<a></a>").attr("href", "#" + id).text(text);
      $li.append($a);
      $toc.append($li);
    });

    // 클릭 시 부드러운 스크롤
    $toc.on("click", "a", function(e) {
      e.preventDefault();
      const target = $($(this).attr("href"));
      if (target.length) {
        $("html, body").animate({
          scrollTop: target.offset().top - 60
        }, 400);
      }
    });
  }

  // 로딩 후 실행
  setTimeout(generateTOC, 1000);

  // 이후 내용 변경 감지 시 자동 갱신
  const observer = new MutationObserver(() => generateTOC());
  const target = document.querySelector('.area_view');
  if (target) observer.observe(target, { childList: true, subtree: true });
});
