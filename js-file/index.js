function toggleNavbar(collapseID) {
    document.getElementById(collapseID).classList.toggle("hidden");
    document.getElementById(collapseID).classList.toggle("flex");
}

const loadInfo = async (searchText) => {
    let url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
    if (searchText) {
        url += `?category=${searchText}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    const information = data.posts;
    displayInfo(information)
}
const displayInfo = async (information) => {
    const theInfoContainer = document.getElementById('the-info-container');
    theInfoContainer.textContent = '';
    information.forEach(info => {
        const escapedTitle = info.title.replace("'", "\\'");
        const infoCard = document.createElement('div');
        infoCard.classList = `hero px-3 py-2 w-full bg-${info.isActive ? "#797DFC1A" : "#F3F3F5"} ${info.isActive ? 'online' : 'offline'} border rounded-3xl shadow-xl`;
        infoCard.innerHTML = `
        <div class="flex flex-col gap-5 lg:gap-10">
    <div class="flex flex-col lg:flex-row gap-3">
    <div id="active-sign" class="inline-block relative">
    <div class="w-24 h-24 lg:w-24 lg:h-24 rounded-3xl overflow-hidden">
        <img src="${info.image}" class="w-full h-full object-cover" alt="Avatar" />
        <div class="absolute left-20 w-5 h-5 inset-0 rounded-full border-4 ${info.isActive ? 'bg-green-500' : 'bg-red-500'}"></div>
    </div>
</div>

        <div class="flex flex-col justify-between">
            <div class="flex flex-col lg:flex-row gap-3">
                <div class="flex justify-center items-center font-inter">
                    #:
                    <span>${info.category}</span>
                </div>
                <div class="flex justify-center items-center">
                    Author: 
                    <span>${info.author ? info.author.name : "Unknown"}</span>
                </div>
            </div>
            <div>
                <h1 class="text-xl font-mulish lg:text-3xl font-bold">${info.title ? info.title : "There is no Title"}</h1>
                <p class="py-3 font-inter">${info.description}</p>
            </div>
        </div>
    </div>
    <hr class="my-6 md:my-6 border-gray-400 border-dashed" />
    <div class="flex justify-between items-center font-inter">
        <div class="flex gap-3 justify-between items-center">
            <div class="flex justify-center items-center">
                <i class="fa-regular fa-message"></i>:
                <span>${info.comment_count}</span>
            </div>
            <div class="flex justify-center items-center">
                <i class="fa-regular fa-eye"></i>:
                <span>${info.view_count}</span>
            </div>
            <div class="flex justify-center items-center">
                <i class="fa-regular fa-clock"></i>:
                <span>${info.posted_time} min</span>
            </div>
        </div>
        <div class="bg-[#10B981] p-1 rounded-full mt-auto"> <!-- mt-auto to push button to the bottom -->
            <button onclick="handleLoadSelected('${escapedTitle}',' ${info.view_count}')">
                <i class="fa-solid fa-envelope-open text-white"></i>
            </button>
        </div>
    </div>
</div>

        `;
        theInfoContainer.appendChild(infoCard);
    });
    toggleSpinner(false);
}

let readCount = 0;

const handleLoadSelected = (title, view_count) => {
    const selectCategory = document.getElementById('select-category');
    const readNumber = document.getElementById('read-number');
    readCount++; const selectedInfo = document.createElement('div');
    selectedInfo.classList = 'flex justify-between item-center bg-white p-4 rounded-3xl mt-5';
    selectedInfo.innerHTML = `
        <h2 class="w-3/4 font-bold text-xl font-mulish">${title}</h2>
        <h2><i class="fa-regular fa-eye"></i>: ${view_count}</h2>
    `;

    selectCategory.appendChild(selectedInfo);
    readNumber.innerText = readCount;
}



const handleSearch = () => {
    const theInfoContainer = document.getElementById('the-info-container');
    theInfoContainer.textContent = '';
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    const loadingGif = document.getElementById('loading-gif');
    if ( searchFieldValue === '' || !isNaN(searchFieldValue)) {
        toggleSpinner(false);
        loadingGif.classList.remove('hidden');
        alert('Please enter a valid input');
    } else if (searchFieldValue === 'comedy' || searchFieldValue === 'music' || searchFieldValue === 'coding' ||typeof searchFieldValue === 'string') {
        loadingGif.classList.add('hidden');
        setTimeout(function () {
            loadInfo(searchFieldValue);
            console.log(searchFieldValue);
        }, 2000);
    } else {
        toggleSpinner(false);
        loadingGif.classList.remove('hidden');
        alert('Please enter a different keyword');
    }

    searchField.value = '';
}



// latestPosts



const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPost(data);
}
const displayLatestPost = (items) => {

    const latestPostContainer = document.getElementById('latestPosts');
    items.forEach(item => {
        const latestPostsCard = document.createElement('div');
        latestPostsCard.classList = 'border-gray-300 border p-3 bg-white shadow-xl rounded-2xl'
        latestPostsCard.innerHTML = `
        <div class="card w-full md:w-96 bg-base-100">
        <figure>
            <img src="${item.cover_image}" />
        </figure>
        <div class="card-body">
            <div class="flex gap-2">
                <span><i class="fa-regular fa-calendar"></i> :</span>
                <h2 class="font-mulish">${item.author.posted_date ? item.author.posted_date : 'No publish date'}</h2>
            </div>
            <h2 class="card-title text-sm md:text-2xl font-bold font-mulish">${item.title ? item.title : 'There is no Title'}</h2>
            <p class="text-xs md:text-base font-inter">${item.description ? item.description : 'There is no description'}</p>
            <div class="card-actions justify-start mt-2 md:mt-4 h-12 md:h-16">
                <div class="avatar">
                    <div class="w-16 h-16 md:w-24 md:h-24 rounded-full">
                        <img src="${item.profile_image ? item.profile_image : 'No Picture'}" />
                    </div>
                    <div class="ml-3 md:ml-5 font-mulish">
                        <h1 class="font-mulish font-bold text-sm md:text-xl">${item.author.name ? item.author.name : 'No Name'}</h1>
                        <p class="text-xs md:text-xl text-gray-400">${item.author.designation ? item.author.designation : 'Unknown'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `
        latestPostContainer.appendChild(latestPostsCard);
    })

}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-seiner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}






// load....................
loadLatestPosts();
loadInfo();

