import { forwardRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import {
  getRequestStatus,
  postRequest,
  resolveRequest,
} from "../../../api/contactApi";
import { useAuth } from "../../../context/authContext";
import ContactForm from "../../features/contact-me-features/ContactForm";
import { FADE_TRANSITION_RULES } from "../../../config/motion.config";
import RequestThread from "../../features/contact-me-features/RequestThread";
import GlassContainer from "../../UI/GlassContainer";
import LoginBtn from "../../UI/LoginBtn";
import SectionHeader from "../../UI/SectionHeader";

const SECTION_TITLE = "Contact me";

const ContactMeSection = forwardRef(function ContactMeSection(props, ref) {
  const { isAuthenticated } = useAuth();

  const queryClient = useQueryClient();

  const requestQuery = useQuery({
    queryKey: ["request"],
    queryFn: getRequestStatus,
    enabled: isAuthenticated,
  });

  const requestMutation = useMutation({
    mutationFn: (message) => postRequest(message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["request"] }),
  });

  const resolveMutation = useMutation({
    mutationFn: resolveRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["request"] }),
  });

  return (
    <section
      ref={ref}
      {...props}
      className="mx-auto min-h-screen w-full max-w-7xl pt-32"
    >
      <SectionHeader>{SECTION_TITLE}</SectionHeader>
      <GlassContainer addClassName="mx-4 flex min-h-[50vh] flex-col rounded-4xl text-center">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={FADE_TRANSITION_RULES}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <LoginBtn />
            </motion.div>
          ) : !requestQuery.data?.has_request ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE_TRANSITION_RULES}
              className="mx-5 my-7 flex flex-1 flex-col items-center justify-center lg:m-8"
            >
              <ContactForm onSubmit={requestMutation.mutate} />
            </motion.div>
          ) : !requestQuery.data?.has_reply ? (
            <motion.div
              key="requesst"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE_TRANSITION_RULES}
              className="mx-5 my-7 flex flex-1 flex-col items-center justify-center lg:m-8"
            >
              <RequestThread
                request={requestQuery.data.request_text}
                onDeleteRequest={resolveMutation.mutate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE_TRANSITION_RULES}
              className="mx-5 my-7 flex flex-1 flex-col items-center justify-center lg:m-8"
            >
              <RequestThread
                request={requestQuery.data.request_text}
                reply={requestQuery.data.reply_text}
                onDeleteRequest={resolveMutation.mutate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </GlassContainer>
    </section>
  );
});

export default ContactMeSection;
