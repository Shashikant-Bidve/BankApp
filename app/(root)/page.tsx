import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: "Shashi", lastName: "Bidve", email: "shashi.bidve18@gmail.com"};
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          type="greeting"
          title="Welcome"
          user = {loggedIn?.firstName || "Guest"}
          subtext = "Access and manage your account and transaction."></HeaderBox>
        

        <TotalBalanceBox
        accounts = {[]}
        totalBanks = {1}
        totalCurrentBalance = {1250.5}
        />
        </header>

      REC TRANS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 100},{}]}></RightSidebar>
    </section>
  )
}

export default Home