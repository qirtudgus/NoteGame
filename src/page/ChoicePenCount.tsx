import BackGround from "../components/BackGround";
import BackHistoryBtn from "../components/BackHistoryBtn";
import BasicBoxs from "../components/userInfo";

const ChoicePenCount = () => {
    return (
    <BackGround>
        <div>원하는 칸의 개수를 골라주세요!
        <ul>
            <li>3</li>
            <li>5</li>
            <li>7</li>
            <li>10</li>
        </ul>
        </div>
        <BackHistoryBtn corner/>
        <BasicBoxs>

        </BasicBoxs>

    </BackGround>    
    )
}


export default ChoicePenCount;

