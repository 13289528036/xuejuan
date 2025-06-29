// ... existing code ...
const teaDataStore = {
    biluochun: {
        name: "江苏碧螺春",
        image: "images/tea_images/biluochun.jpg", // 假设图片在 images/tea_images/ 目录下
        fullDescription: "碧螺春是中国传统名茶，以其螺旋形状和清香著称。产于江苏太湖周边，历史悠久，品质优异。",
        // 可以添加更多属性，如历史、产地、冲泡方法等
    },
    longjing: {
        name: "西湖龙井",
        image: "images/tea_images/longjing.jpg",
        fullDescription: "西湖龙井，产于浙江杭州西湖一带，是中国十大名茶之一。其色绿、香郁、味甘、形美，四绝著称于世。"
    },
    "tieguanyin": {
        name: "福建铁观音",
        bannerImage: "../images/tea_images/tieguanyin_banner.jpg", // Assuming a banner image path
        detailImage: "../images/tea_images/tieguanyin_detail.jpg",
        description: "铁观音，福建安溪当地茶农发明于1725-1735年间。属于乌龙茶类，是中国十大名茶之一乌龙茶类的代表。介于绿茶和红茶之间，属于半发酵茶类，铁观音独具“观音韵”，清香雅韵，冲泡后有天然的兰花香，滋味纯浓,香气馥郁持久，有“七泡有余香之誉”。",
        characteristics: [
            "外形：条索肥壮，沉重，砂绿明显。",
            "汤色：金黄浓艳，清澈明亮。",
            "香气：馥郁持久，有天然的兰花香。",
            "滋味：醇厚甘鲜，回味悠长，“观音韵”明显。"
        ],
        brewingGuide: [
            "选用紫砂壶或盖碗，沸水冲泡。",
            "“高冲低斟”，第一泡洗茶，后续每泡时间逐渐延长。",
            "可多次冲泡，品味不同泡数的风味。"
        ],
        pageUrl: "teas/tieguanyin.html" // Link to the detail page
    },
    // 为其他茶叶添加类似的数据...
};

teaCards.forEach(card => {
    card.addEventListener('click', () => {
        const teaKey = card.getAttribute('data-tea'); // 从data-tea属性获取茶叶的键
        const teaInfo = teaDataStore[teaKey];

        if (teaInfo) {
            showTeaDetailModal(teaInfo);
        } else {
            // 如果没有找到茶叶信息，可以显示一个默认信息或跳转到茶叶列表页
            alert(`抱歉，暂无 ${card.querySelector('h3').textContent} 的详细信息。`);
        }
    });
});

function showTeaDetailModal(teaData) {
    const tea = teaDataStore[teaKey];
    if (tea) {
        document.getElementById('modalTeaName').textContent = tea.name;
        const modalTeaDetail = document.getElementById('modalTeaDetail');
        modalTeaDetail.innerHTML = `
            <img src="${tea.detailImage}" alt="${tea.name}" style="width: 100%; max-width: 300px; display: block; margin: 0 auto 15px;">
            <p><strong>介绍：</strong> ${tea.description}</p>
            <p><strong>茶叶特点：</strong></p>
            <ul>
                ${tea.characteristics.map(char => `<li>${char}</li>`).join('')}
            </ul>
            <p><strong>冲泡方法：</strong></p>
            <ul>
                ${tea.brewingGuide.map(guide => `<li>${guide}</li>`).join('')}
            </ul>
            <p><a href="${tea.pageUrl}" target="_blank">查看详情页面</a></p>
        `;
        // Assuming you have a modal element with id 'teaModal'
        const modal = document.getElementById('teaModal');
        if (modal) {
            modal.style.display = 'block';
        }
    } else {
        console.error('Tea data not found for key:', teaKey);
    }
}