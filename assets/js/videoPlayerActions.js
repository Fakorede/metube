function likeVideo(button, videoId) {
  $.post("ajax/likeVideo.php", { videoId: videoId }).done(function(data) {
    // update button
    var likeButton = $(button);
    var dislikeButton = $(button).siblings(".dislikeButton");

    likeButton.addClass("active");
    dislikeButton.removeClass("active");

    // parse returned string to json object
    var result = JSON.parse(data);

    // update values
    updateLikesValue(likeButton.find(".text"), result.likes);
    updateLikesValue(dislikeButton.find(".text"), result.dislikes);

    if (result.likes < 0) {
      // remove active class if not liked
      likeButton.removeClass("active");
      // use like icon
      likeButton
        .find("img:first")
        .attr("src", "assets/images/icons/thumb-up.png");
    } else {
      // use liked icon
      likeButton
        .find("img:first")
        .attr("src", "assets/images/icons/thumb-up-active.png");
    }

    // dislike icon
    dislikeButton
      .find("img:first")
      .attr("src", "assets/images/icons/thumb-down.png");
  });
}

function dislikeVideo(button, videoId) {
  $.post("ajax/dislikeVideo.php", { videoId: videoId }).done(function(data) {
    // update button
    var dislikeButton = $(button);
    var likeButton = $(button).siblings(".likeButton");

    dislikeButton.addClass("active");
    likeButton.removeClass("active");

    // parse returned string to json object
    var result = JSON.parse(data);

    // update values
    updateLikesValue(likeButton.find(".text"), result.likes);
    updateLikesValue(dislikeButton.find(".text"), result.dislikes);

    if (result.dislikes < 0) {
      // remove active class if not disliked
      dislikeButton.removeClass("active");
      // use dislike icon
      dislikeButton
        .find("img:first")
        .attr("src", "assets/images/icons/thumb-down.png");
    } else {
      // use disliked icon
      dislikeButton
        .find("img:first")
        .attr("src", "assets/images/icons/thumb-down-active.png");
    }

    // like icon
    likeButton
      .find("img:first")
      .attr("src", "assets/images/icons/thumb-up.png");
  });
}

function updateLikesValue(element, num) {
  var likesCountVal = element.text() || 0;
  element.text(parseInt(likesCountVal) + parseInt(num));
}
