window.addEventListener("load", main);

function main() {
  document.getElementById("titleadd").value = "";
  document.getElementById("titleedit").value = "";
  document.getElementById("contentadd").value = "";
  document.getElementById("contentedit").value = "";
  document.getElementById("user-review-search").value = "";

  const botonMostrarModalAdd = document.getElementById("add-btn");
  const miModal = document.getElementById("miModal");
  const modalAdd = document.getElementById("add-review-form");
  const modalEdit = document.getElementById("edit-review-form");
  const modalDelet = document.getElementById("delete-review-form");

  var userReviews = [
    { id: "0", user: "Usuario1", title: "Reseña A", content: "Una reseña de la comunidad." },
    { id: "1", user: "Usuario2", title: "Reseña B", content: "Otra reseña de la comunidad." }
  ];

  var communityReviews = [
    { user: "Usuario1", title: "Reseña A", content: "Una reseña de la comunidad." },
    { user: "Usuario2", title: "Reseña B", content: "Otra reseña de la comunidad." }
  ];

  document.getElementById("user-review-search").addEventListener("keyup", searchUserReviews);
  document.getElementById("add").addEventListener("click", addReview);

  function displayUserReviews() {
    var userReviewsTable = document.getElementById("user-reviews-table").getElementsByTagName('tbody')[0];
    userReviewsTable.innerHTML = '';
    userReviewsTable.style.height = "90px";

    userReviews.forEach(function (review, index) {
      var row = userReviewsTable.insertRow();
      row.insertCell(0).textContent = review.id;
      row.insertCell(1).textContent = review.user;
      row.insertCell(2).textContent = review.title;
      var actionsCell = row.insertCell(3);

      var editBtn = document.createElement("a");
      editBtn.className = "edit-btn";
      editBtn.onclick = function () {
        editReview(index);
      };

      var deleteBtn = document.createElement("a");
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = function () {
        deleteReview(index);
      };

      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);
    });
  }

  function displayCommunityReviews() {
    var communityReviewsTable = document.getElementById("community-reviews-table").getElementsByTagName('tbody')[0];
    communityReviewsTable.innerHTML = '';

    (communityReviews.concat(userReviews)).forEach(function (review) {
      var row = communityReviewsTable.insertRow();
      var userCell = row.insertCell(0);
      var titleCell = row.insertCell(1);
      var contentCell = row.insertCell(2);

      userCell.textContent = review.user;
      titleCell.textContent = review.title;
      contentCell.textContent = review.content;
    });
  }

  function addReview(event) {
    event.preventDefault();
    var titleInput = document.getElementById("titleadd");
    var contentInput = document.getElementById("contentadd");
    var newReview = {
      title: titleInput.value,
      content: contentInput.value
    };
    addFunction()
    userReviews.push(newReview);
    displayUserReviews();
    titleInput.value = "";
    contentInput.value = "";
    closeModal();
  }

  function editReview(index) {
    var reviewToEdit = userReviews[index];
    miModal.style.display = "block";
    modalEdit.style.display = "block";
    var titleInput = document.getElementById("titleedit");
    var contentInput = document.getElementById("contentedit");
    titleInput.value = reviewToEdit.title;
    contentInput.value = reviewToEdit.content;
    document.getElementById("edit").addEventListener('click', function (event) {
      event.preventDefault();
      if (titleInput !== null && contentInput !== null) {
        reviewToEdit.title = titleInput.value;
        reviewToEdit.content = contentInput.value;
        displayUserReviews();
      }
      closeModal();
    })
  }

  function deleteReview(index) {
    miModal.style.display = "block";
    modalDelet.style.display = "block";
    document.getElementById("delete").addEventListener('click', function (event) {
      event.preventDefault()
      userReviews.splice(index, 1);
      displayUserReviews();
      closeModal();
    })
  }

  displayUserReviews();
  displayCommunityReviews();

  function searchUserReviews() {
    var input = document.getElementById('user-review-search');
    var filter = input.value.toLowerCase();
    var userReviewsTable = document.getElementById("user-reviews-table").getElementsByTagName('tbody')[0];
    var rows = userReviewsTable.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
      var title = rows[i].getElementsByTagName('td')[0];
      var content = rows[i].getElementsByTagName('td')[1];

      if (title || content) {
        var titleValue = title.textContent || title.innerText;
        var contentValue = content.textContent || content.innerText;

        if (titleValue.toLowerCase().indexOf(filter) > -1 || contentValue.toLowerCase().indexOf(filter) > -1) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  }

  botonMostrarModalAdd.addEventListener("click", function () {
    miModal.style.display = "block";
    modalAdd.style.display = "block";
  });

  document.getElementById("cerrar-modal").addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target === miModal) {
      miModal.style.display = "none";
      modalAdd.style.display = "none";
      modalEdit.style.display = "none";
      modalDelet.style.display = "none";
    }
  });

  function closeModal() {
    miModal.style.display = "none";
    modalAdd.style.display = "none";
    modalEdit.style.display = "none";
    modalDelet.style.display = "none";
  }

  displayUserReviews();
  displayCommunityReviews();
}