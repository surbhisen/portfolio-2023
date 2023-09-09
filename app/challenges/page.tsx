"use client"

import { Footer, LoadingAnimation } from '@/components';
import ChallengeContainer from '@/components/Challenges/ChallengeContainer';
import ChallengesNavbar from '@/components/Challenges/ChallengesNavbar';
import { client } from '@/components/client';
import React, { useEffect } from 'react'

const Challenges = () => {

  const [jsChallenges, setJsChallenges] = React.useState({
    title: 'Javascript',
    items: []
  });
  const [reactChallenges, setReactChallenges] = React.useState({
    title: 'React',
    items: []
  });
  const [assignments, setAssignments] = React.useState({
    title: 'Assignments',
    items: []
  });
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    try {
      const jsquery = '*[_type == "jschallenges"]';
      const reactquery = '*[_type == "reactchallenges"]';
      const assignmentsquery = '*[_type == "assignments"]';
      client.fetch(jsquery).then((data) => {
        if (!data) return;
        setJsChallenges(prev => prev = { ...prev, items: data });
      });
      client.fetch(reactquery).then((data) => {
        if (!data) return;
        setReactChallenges(prev => prev = { ...prev, items: data });
      });
      client.fetch(assignmentsquery).then((data) => {
        if (!data) return;
        setAssignments(prev => prev = { ...prev, items: data });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  }, [])

  return (
    <main className='challenges min-h-screen '>
      <ChallengesNavbar />
      <div className='challenges__container max-w-7xl mx-auto flex justify-center flex-col h-max'>
        {
          isLoading 
          ? <LoadingAnimation /> 
          : <>
            <ChallengeContainer title={jsChallenges.title} items={jsChallenges.items} />
            <ChallengeContainer title={reactChallenges.title} items={reactChallenges.items} />
            <ChallengeContainer title={assignments.title} items={assignments.items} />
          </>
        }
      </div>
      <Footer />
    </main>
  )
}

export default Challenges