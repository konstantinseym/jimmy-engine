import {
  COMMENT_VALIDATION_RULES,
  CONTACT_VALIDATION_RULES,
} from "./validationRules";

export function validateComment(comment) {
  const validatedComment = comment.trim();

  if (
    validatedComment.length < COMMENT_VALIDATION_RULES.min ||
    validatedComment.length > COMMENT_VALIDATION_RULES.max
  ) {
    return null;
  } else {
    return validatedComment;
  }
}

export function validateMessage(message) {
  const validatedMessage = message.trim();

  if (
    validatedMessage.length < CONTACT_VALIDATION_RULES.min ||
    validatedMessage.length > CONTACT_VALIDATION_RULES.max
  ) {
    return null;
  } else {
    return validatedMessage;
  }
}
