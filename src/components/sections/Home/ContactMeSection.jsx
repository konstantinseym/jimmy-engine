import FormContactMe from "../../features/FormContactMe";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef } from "react";
import { useAuth } from "../../../context/authContext";
import BtnAsText from "../../UI/BtnAsText";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRequestStatus,
  postRequest,
  resolveRequest,
} from "../../../api/contactApi";

const SECTION_TITLE = "Contact me";

const ContactMeSection = forwardRef(function ContactMeSection(props, ref) {
  const { isAuthenticated, signIn } = useAuth();

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
    <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-2">
          <p className="text-center">I read every message personally.</p>
          <p className="text-center">
            Expect a thoughtful reply. It will apper right here.
          </p>

          {!isAuthenticated ? (
            <div className="mt-12 text-center">
              <p>But please sign in first</p>
              <BtnAsText onClick={signIn}>Login via Google</BtnAsText>
            </div>
          ) : !requestQuery.data?.has_request ? (
            <FormContactMe onSubmit={requestMutation.mutate} />
          ) : !requestQuery.data?.has_reply ? (
            <div>
              <p>Your request sent, wait</p>
              <BtnAsText onClick={resolveMutation.mutate}>resolve</BtnAsText>
            </div>
          ) : (
            <div>
              <p>Your reply: {requestQuery.data.reply_text}</p>
              <BtnAsText onClick={resolveMutation.mutate}>resolve</BtnAsText>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default ContactMeSection;
