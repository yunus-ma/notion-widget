// 获取所有需要操作的 DOM 元素
const hourGroup = document.querySelector('#hours');
const minuteGroup = document.querySelector('#minutes');
const secondGroup = document.querySelector('#seconds');
const amPmEl = document.querySelector('#am-pm');
const dayOfWeekEl = document.querySelector('#day-of-week');

const hourCards = hourGroup.querySelectorAll('.digit-card');
const minuteCards = minuteGroup.querySelectorAll('.digit-card');
const secondCards = secondGroup.querySelectorAll('.digit-card');

const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

// 时间更新的主循环
function updateClock() {
    const now = new Date();
    
    // 获取时间, 并格式化
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const dayIndex = now.getDay();
    
    // --- 更新 AM/PM 和 星期 ---
    const amPm = hours >= 12 ? 'PM' : 'AM';
    amPmEl.textContent = amPm;
    dayOfWeekEl.textContent = days[dayIndex];

    // --- 格式化为 12 小时制和两位数 ---
    const h12 = hours % 12 === 0 ? 12 : hours % 12; // 12小时制
    const hStr = String(h12).padStart(2, '0');
    const mStr = String(minutes).padStart(2, '0');
    const sStr = String(seconds).padStart(2, '0');

    // --- 检查并更新数字卡片 ---
    // 比较当前数字和新数字，如果不同则触发翻转
    flipCard(hourCards[0], hStr[0]);
    flipCard(hourCards[1], hStr[1]);
    flipCard(minuteCards[0], mStr[0]);
    flipCard(minuteCards[1], mStr[1]);
    flipCard(secondCards[0], sStr[0]);
    flipCard(secondCards[1], sStr[1]);
}

/**
 * 核心翻转函数
 * @param {HTMLElement} card - 要翻转的 .digit-card 元素
 * @param {string} newDigit - 要显示的新数字
 */
function flipCard(card, newDigit) {
    const oldDigit = card.dataset.digit;

    // 如果数字没变，则不执行任何操作
    if (oldDigit === newDigit) {
        return;
    }

    // 更新 data-digit 属性, CSS 会自动更新静态的上下部分
    card.dataset.digit = newDigit;

    // --- 创建动画元素 ---
    
    // 1. 创建 "顶部翻转" (显示旧数字, 向下翻)
    const flipperTop = document.createElement('div');
    flipperTop.classList.add('flipper', 'top-flip');
    flipperTop.textContent = oldDigit;

    // 2. 创建 "底部翻转" (显示新数字, 从中间翻下来)
    const flipperBottom = document.createElement('div');
    flipperBottom.classList.add('flipper', 'bottom-flip');
    flipperBottom.textContent = newDigit;

    // 3. 将翻转元素添加到卡片中
    card.appendChild(flipperTop);
    card.appendChild(flipperBottom);

    // 4. 监听动画结束事件，在动画完成后移除翻转元素
    flipperTop.addEventListener('animationend', () => {
        flipperTop.remove();
    });
    flipperBottom.addEventListener('animationend', () => {
        flipperBottom.remove();
    });
}

// 立即运行一次以设置初始时间
updateClock();

// 每秒钟运行一次
setInterval(updateClock, 1000);