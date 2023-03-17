import ChatTabBar from "./ChatTabBar";
import FeedBack from "./FeedBack";
import InviteCode from "./InviteCode";
import PaymentPlan from "./PaymentPlan";
import MyPlan from "./MyPlan";
import ProfileIndex from "./ProfileIndex";

module.exports = [
    {name: 'TabBar', component: ChatTabBar, options: {headerShown: false}},
    {name: 'feedback', component: FeedBack},
    {name: 'invite-code', component: InviteCode},
    {name: 'payment-plan', component: PaymentPlan},
    {name: 'my-plan', component: MyPlan},
    {name: 'profile-index', component: ProfileIndex},
]
